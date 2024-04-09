import React, { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/auth/authSlice';
import { Loading } from "../../components/common/Loading";

function Login() {
  const { loading, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
  let username = useRef('');
	let password = useRef('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({
      username:username.value,
      password:password.value,
    }))
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/'); // navigate to the next page
    }
  };

  return (
    <div>
      <section className="bg-[#F8F8F8] py-20 lg:py-[120px] h-dvh">
        <div className="container mx-auto">
          <div className="bg-white">
            <div className="flex flex-wrap items-stretch">
              <div className="w-full lg:w-1/2">
                <div className="w-full py-14 px-6 sm:p-[70px] sm:px-12 xl:px-[90px]">
                  <h2 className="text-dark mb-10 text-[32px] font-bold">
                    Sign In
                  </h2>
                  {error && (
                    <p className="text-red-500 text-xs italic">{error}</p>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <label className="mb-3 block text-xs text-[#ACB6BE]">
                        Username
                      </label>
                      <input
                        type="text"
                        className="text-body-color focus:border-primary w-full rounded-md border border-[#E9EDF4] py-3 px-[14px] outline-none focus-visible:shadow-none"
                        ref={(e) => { username = e; } }
                      />
                    </div>
                    <div className="mb-8">
                      <label className="text-body-color mb-3 block border-[#ACB6BE] text-xs">
                        Your Password
                      </label>
                      <input
                        type="password"
                        className="text-body-color focus:border-primary w-full rounded-md border border-[#E9EDF4] py-3 px-[14px] outline-none focus-visible:shadow-none"
                        ref={(e) => { password = e; } }
                      />
                    </div>
                    <div className="mb-8">
                    <button type="submit" className="border-primary bg-primary w-full cursor-pointer rounded-md border py-3 px-[14px] text-white transition hover:bg-opacity-90">
                      {
                      loading &&
                      <Loading/>
                      }
                      Sign In
                    </button>

                    </div>
                  </form>
                </div>
              </div>
              <div className="hidden lg:block w-full lg:w-1/2">
                <div className="bg-primary relative h-full w-full overflow-hidden">
                  <div className="flex h-full items-end p-8 sm:p-14">
                    <h3 className="text-2xl font-bold text-white">
                      Hello <br />
                      Welcome To Doctus Tech Test<br />
                    </h3>
                    <div>
                      <span className="absolute left-0 top-0">
                        <svg
                          width="415"
                          height="355"
                          viewBox="0 0 415 355"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M415 107.5C415 244.19 304.19 355 167.5 355C30.8095 355 -80 244.19 -80 107.5C-80 -29.1905 30.8095 -140 167.5 -140C304.19 -140 415 -29.1905 415 107.5Z"
                            fill="url(#paint0_linear_1179_8)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1179_8"
                              x1="167.5"
                              y1="-140"
                              x2="167.5"
                              y2="355"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                offset="0.177083"
                                stopColor="white"
                                stopOpacity="0.16"
                              />
                              <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute top-0 left-0">
                        <svg
                          width="177"
                          height="354"
                          viewBox="0 0 177 354"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M177 177C177 274.754 97.7544 354 0 354C-97.7544 354 -177 274.754 -177 177C-177 79.2456 -97.7544 0 0 0C97.7544 0 177 79.2456 177 177Z"
                            fill="url(#paint0_linear_1179_7)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1179_7"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="354"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                offset="0.177083"
                                stopColor="white"
                                stopOpacity="0.2"
                              />
                              <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute bottom-16 right-20">
                        <svg
                          width="85"
                          height="85"
                          viewBox="0 0 85 85"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M42.5 -1.85773e-06C65.9721 -2.88373e-06 85 19.0279 85 42.5C85 65.9721 65.9721 85 42.5 85C19.0279 85 -8.31736e-07 65.9721 -1.85773e-06 42.5C-2.88373e-06 19.0279 19.0279 -8.31736e-07 42.5 -1.85773e-06Z"
                            fill="url(#paint0_linear_1179_6)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1179_6"
                              x1="-1.85774e-06"
                              y1="42.5"
                              x2="85"
                              y2="42.5"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                offset="0.177083"
                                stopColor="white"
                                stopOpacity="0.16"
                              />
                              <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
