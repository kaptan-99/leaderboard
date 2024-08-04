import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div class="w-full h-screen flex justify-center items-center">
<div className="login-content page-card">
  <div className="page-card-head">
    <img className="app-logo" src={process.env.LOGO_MAIN} />
    <h4>Login to Robin Hood Army</h4>
  </div>
  <form className="form-signin form-login" role="form">
    <div className="page-card-body">
      <div className="page-card-body">
        <div className="form-group">
          <label className="form-label sr-only" htmlFor="login_email">
            Email
          </label>
          <div className="email-field">
            <input
              type="text"
              id="login_email"
              className="form-control"
              placeholder="jane@example.com"
              required=""
              autofocus=""
              autoComplete="username"
            />
            <svg
              className="field-icon email-icon"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 7.65149V15.0757C2.5 15.4374 2.64367 15.7842 2.8994 16.04C3.15513 16.2957 3.50198 16.4394 3.86364 16.4394H16.1364C16.498 16.4394 16.8449 16.2957 17.1006 16.04C17.3563 15.7842 17.5 15.4374 17.5 15.0757V7.65149"
                stroke="#74808B"
                strokeMiterlimit={10}
                strokeLinecap="square"
              />
              <path
                d="M17.5 7.57572V5.53026C17.5 5.1686 17.3563 4.82176 17.1006 4.56603C16.8449 4.31029 16.498 4.16663 16.1364 4.16663H3.86364C3.50198 4.16663 3.15513 4.31029 2.8994 4.56603C2.64367 4.82176 2.5 5.1686 2.5 5.53026V7.57572L10 10.8333L17.5 7.57572Z"
                stroke="#74808B"
                strokeMiterlimit={10}
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label sr-only" htmlFor="login_password">
            Password
          </label>
          <div className="password-field">
            <input
              type="password"
              id="login_password"
              className="form-control"
              placeholder="•••••"
              autoComplete="current-password"
              required=""
            />
            <svg
              className="field-icon password-icon"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0961 1.93768H10.0264C8.94806 1.92763 7.90976 2.34591 7.13951 3.10075C6.36866 3.85619 5.9294 4.88687 5.91833 5.96612L5.91831 5.96612V5.97124V6.52695H4.3125C3.20793 6.52695 2.3125 7.42238 2.3125 8.52695V16.0165C2.3125 17.121 3.20793 18.0165 4.3125 18.0165H15.7356C16.8401 18.0165 17.7356 17.121 17.7356 16.0165V8.52695C17.7356 7.42238 16.8401 6.52695 15.7356 6.52695H14.1297V6.04576C14.1397 4.96742 13.7214 3.92913 12.9666 3.15888C12.2112 2.38803 11.1805 1.94877 10.1012 1.9377V1.93768H10.0961ZM13.1297 6.52695V6.04336V6.03838H13.1297C13.1378 5.22428 12.8222 4.44029 12.2524 3.85881C11.6831 3.27793 10.9067 2.94667 10.0934 2.93768H10.024H10.019V2.93765C9.20491 2.92955 8.42092 3.24512 7.83944 3.81497C7.25856 4.38423 6.9273 5.1607 6.91831 5.9739V6.52695H13.1297ZM4.3125 7.52695C3.76022 7.52695 3.3125 7.97467 3.3125 8.52695V16.0165C3.3125 16.5687 3.76022 17.0165 4.3125 17.0165H15.7356C16.2879 17.0165 16.7356 16.5687 16.7356 16.0165V8.52695C16.7356 7.97467 16.2879 7.52695 15.7356 7.52695H4.3125ZM10.0242 13.2384C10.5581 13.2384 10.9909 12.8056 10.9909 12.2717C10.9909 11.7377 10.5581 11.3049 10.0242 11.3049C9.49023 11.3049 9.05738 11.7377 9.05738 12.2717C9.05738 12.8056 9.49023 13.2384 10.0242 13.2384ZM11.9909 12.2717C11.9909 13.3579 11.1104 14.2384 10.0242 14.2384C8.93794 14.2384 8.05738 13.3579 8.05738 12.2717C8.05738 11.1854 8.93794 10.3049 10.0242 10.3049C11.1104 10.3049 11.9909 11.1854 11.9909 12.2717Z"
                fill="#74808B"
              />
            </svg>
            <span
              toggle="#login_password"
              className="toggle-password text-muted"
            >
              Show
            </span>
          </div>
        </div>
        <p className="forgot-password-message">
          <a href="#forgot">Forgot Password?</a>
        </p>
      </div>
      <div className="page-card-actions">
        <button
          className="btn btn-sm btn-primary btn-block btn-login"
          type="submit"
        >
          Login
        </button>
      </div>
      <div className="social-logins text-center">
        <p className="text-muted login-divider">or</p>
        <div className="social-login-buttons">
          <div className="login-button-wrapper">
            <a
              href="https://www.facebook.com/dialog/oauth?redirect_uri=https%3A%2F%2Fcheckin.robinhoodarmy.com%2Fapi%2Fmethod%2Ffrappe.www.login.login_via_facebook&state=eyJzaXRlIjogImh0dHBzOi8vY2hlY2tpbi5yb2Jpbmhvb2Rhcm15LmNvbSIsICJ0b2tlbiI6ICI4YTA3NTY1NWU0NTJiOTE2M2I1NDU5N2RkYWUwMDg1NmRiNTU2N2E2MWM4MmFjZDY0MmQ3OGFkZSIsICJyZWRpcmVjdF90byI6IG51bGx9&display=page&response_type=code&scope=email%2Cpublic_profile&client_id=1077099302859935"
              className="btn btn-block btn-default btn-sm btn-login-option btn-facebook"
            >
              <img
                src="/assets/frappe/icons/social/facebook.svg"
                alt="Facebook"
              />
              Login With Facebook
            </a>
          </div>
          <div className="login-button-wrapper">
            <a
              href="https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Fcheckin.robinhoodarmy.com%2Fapi%2Fmethod%2Ffrappe.www.login.login_via_google&state=eyJzaXRlIjogImh0dHBzOi8vY2hlY2tpbi5yb2Jpbmhvb2Rhcm15LmNvbSIsICJ0b2tlbiI6ICJmNmNjNzZhMmYzZWZjNzU1ZGMzMjhhZDU3YjhkZjg1MWJjNWEzZDNiZjgzNzgyNDU2MDQ2NjViOCIsICJyZWRpcmVjdF90byI6IG51bGx9&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=619660774175-0atsegdao3cbm7por3fa5562tcif9m7f.apps.googleusercontent.com"
              className="btn btn-block btn-default btn-sm btn-login-option btn-google"
            >
              <img src="/assets/frappe/icons/social/google.svg" alt="Google" />
              Login With Google
            </a>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

</div>

  )
}

export default page