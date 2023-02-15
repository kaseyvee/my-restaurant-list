export default function getLoggedInUser() {
  if (window) {
    const loggedInUserUnparsed: any = window.localStorage.getItem('pocketbase_auth');
    const loggedInUserParsed = JSON.parse(loggedInUserUnparsed);
    let loggedInUser = null;
    if (loggedInUserParsed) {
      loggedInUser = loggedInUserParsed.model;
    }
  
    return loggedInUser;
  }
}