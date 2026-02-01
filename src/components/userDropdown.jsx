import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CircleUserRound, LogOut, User} from "lucide-react";
import {logoutUser} from "../thunks/auth.thunk.js";

export default function UserDropdown() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    // REDUX SELECTORS
    const {isAuthenticated} = useSelector((state) => state.auth);
    const {profile} = useSelector((state) => state.user);

    // HANDLE PROFILE CLICK
    const handleProfile = () => {
        navigate("/profile");
        setIsOpen(false);
    };

    // HANDLE LOGIN CLICK
    const handleLogin = () => {
        navigate("/login");
        setIsOpen(false);
    };

    // HANDLE LOGOUT CLICK
    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("accessToken");
        navigate("/login");
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 group text-black"
            >
                <CircleUserRound size={21} strokeWidth={2}/>
                <span className="text-[14px] font-medium tracking-tight hidden lg:block">
          {profile ? "Account" : "Login"}
        </span>
            </button>

            {/* DROPDOWN MENU */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {isAuthenticated && profile ? (
                        <>
                            {/* USER INFO */}
                            <div className="px-4 py-3 border-b border-gray-200">
                                <p className="text-sm font-medium text-black">{profile.username}</p>
                                <p className="text-xs text-gray-500">{profile.email}</p>
                            </div>

                            {/* PROFILE OPTION */}
                            <button
                                onClick={handleProfile}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-black hover:bg-gray-50 transition-colors"
                            >
                                <User size={16}/>
                                Profile
                            </button>

                            {/* LOGOUT OPTION */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200"
                            >
                                <LogOut size={16}/>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* LOGIN OPTION */}
                            <button
                                onClick={handleLogin}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-black hover:bg-gray-50 transition-colors"
                            >
                                <CircleUserRound size={16}/>
                                Login
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* CLOSE DROPDOWN ON OUTSIDE CLICK */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}