import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import sendEmail from "@/constants/sendEmail";
import nextLogger from "@/constants/logger";
import Investment from "@/models/Investment";
import Company from "@/models/Company";
import User from "@/models/User";
import Return from "@/models/Return";
import ReturnsEmail from "@/email-templates/ReturnsEmail";

export const GET = async (request: Request) => {
  try {
    await mongooseConnect();
    //code logic
    const investments = await Investment.find({ status: "active" });

    const companies = await Company.find({});
    const company = companies[0];
    if (!company) throw new Error("No Comany info");

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (company.lastInvestmentDailyCronJob > currentDate.getTime()) {
      nextLogger.info("Cron Job Investment already ran for the day");
      return NextResponse.json({
        message: "Cron Job Investment already ran for the day",
      });
    }

    if (investments.length <= 0) {
      nextLogger.info("No Active Investments");
      return NextResponse.json({ message: "No Active Investments" });
    }

    for (const investment of investments) {
      const dailyPercent = investment.ROIDaily / 100;

      if (investment.duration > 0) {
        const dailyProfit = investment.amountInvested * dailyPercent;

        await Investment.findByIdAndUpdate(investment._id, {
          $inc: {
            duration: -1,
            ROIReceived: dailyProfit,
          },
        });

        await User.findByIdAndUpdate(investment.userId, {
          $inc: {
            investProfitBalance: dailyProfit,
            investWithdrawableBalance: dailyProfit,
          },
        });

        const oneDay = 86400000; // 180000
        await Company.findByIdAndUpdate(company._id, {
          lastInvestmentDailyCronJob: currentDate.getTime() + oneDay,
        });

        const newReturn = new Return({
          title: "New Return",
          amount: dailyProfit,
          investmentId: investment._id,
        });
        const savedReturn: ReturnProps = await newReturn.save();

        const user = await User.findById(investment.userId);
        const updatedInvestment = await Investment.findById(investment._id);

        const emailHtml = render(
          ReturnsEmail({
            planName: updatedInvestment.planName,
            fullname: user.fullname,
            profitAmount: savedReturn.amount,
            totalProfit: updatedInvestment.ROIReceived,
            investmentId: updatedInvestment._id,
            company,
          })
        );

        await sendEmail(
          user.email,
          savedReturn.title,
          `You have a new return in your ${updatedInvestment.planName} investment`,
          emailHtml,
          company
        );
      }

      if (investment.duration <= 0) {
        await Investment.findByIdAndUpdate(investment._id, {
          status: "completed",
        });

        await User.findByIdAndUpdate(investment.userId, {
          $inc: {
            investBalance: -investment.amountInvested,
            investProfitBalance: -investment.ROIReceived,
            investWithdrawableBalance: investment.amountInvested,
          },
        });
      }
    }

    nextLogger.info("Investment Operation is Successfull");
    return NextResponse.json({
      message: "Investment Operation is Successfull",
    });
  } catch (error: any) {
    nextLogger.error(error.message);
    return NextResponse.json({ error: error.message });
  }
};
