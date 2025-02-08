export const calculateNextPaymentDate = (joiningDate, duration) => {
    const joining = new Date(joiningDate);
    const today = new Date();
  
    if (duration === "monthly") {
      // Calculate the next payment date (1 month after joining)
      joining.setMonth(joining.getMonth() + 1);
    } else if (duration === "yearly") {
      // Calculate the next payment date (1 year after joining)
      joining.setFullYear(joining.getFullYear() + 1);
    }
  
    return joining;
  };