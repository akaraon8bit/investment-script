const formatNumber = (number) => {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

const retunsEmail = (
  planName,
  profitAmount,
  fullname,
  totalProfit,
  investmentId,
  company,
  formattedDate
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><html lang="en"><head data-id="__react-email-head"></head><div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">New Return on your ${planName}<div> ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏</div></div><body data-id="__react-email-body" style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;width:580px;margin:30px auto;background-color:#ffffff"><tbody><tr style="width:100%"><td><table align="center" width="100%" data-id="react-email-section" style="padding:10px;width:100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><img data-id="react-email-img" alt="${
    company.name
  }" src="${
    company.logo.url
  }" width="auto" height="60" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"/></td></tr></tbody></table><table align="center" width="100%" data-id="react-email-section" style="width:100%;display:flex" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><table align="center" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0"><tbody style="width:100%"><tr style="width:100%"><td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td><td data-id="__react-email-column" style="border-bottom:1px solid #f43f5e;width:102px"></td><td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" data-id="react-email-section" style="padding:5px 25px 10px 25px" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><h1 data-id="react-email-heading" style="font-size:25px;font-weight:bold;text-align:center;padding:10px 0 10px 0">Dear ${fullname},</h1><h1 data-id="react-email-heading" style="font-size:15px;font-weight:bold;text-align:center;padding:10px 5px 10px 5px;color:${
    company.color.primaryVeryLight
  }">You have a new return in your ${planName} investment</h1><p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Profit received:<b> ${
    company.currency.symbol + formatNumber(profitAmount)
  }</b></p><p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Plan Name:<b> ${planName}</b></p><p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Total Profit so far:<b> ${
    company.currency.symbol + formatNumber(totalProfit)
  }</b></p><p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Date:<b> ${formattedDate}</b></p></td></tr></tbody></table><table align="center" width="100%" data-id="react-email-section" style="text-align:center" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><a href="${
    company.baseUrl
  }/home/invest-and-earn/${investmentId}" data-id="react-email-button" target="_blank" style="border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;background-color:${
    company.color.primary
  };line-height:100%;max-width:100%;padding:12px 12px"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">View Details</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td></tr></tbody></table><table align="center" width="100%" data-id="react-email-section" style="padding:5px 25px 10px 25px" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Thanks, ${
    company.name
  } Finance Team</p></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" data-id="react-email-section" style="width:580px;margin:0 auto" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© ${new Date().getFullYear()} ${
    company.name
  }, All Rights Reserved <br/>${
    company.address
  }</p></td></tr></tbody></table></body></html>`;
};

module.exports = { retunsEmail };
