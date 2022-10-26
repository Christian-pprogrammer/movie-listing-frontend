export default function getError(err) {
  console.log(err);
  if(err.response?.data?.message) {
    return err.response.data.message;
  }else if(err.response?.data?.errors) {
    return err.response.data.errors[0].message
  }else if(err.response?.data?.error && typeof(err.response?.data?.error) === "string") {
    return err.response?.data?.error
  }
  else{
    return err.message;
  }
}