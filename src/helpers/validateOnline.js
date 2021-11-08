const validateOnline = () => {
  if (process.env.VALIDATE_ONLINE === 'true' && !navigator.onLine) return false;
  return true;
};

export default validateOnline;
