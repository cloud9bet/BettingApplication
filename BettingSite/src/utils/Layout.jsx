import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { GetUserPresetsAsync } from "../services/ControllerService/userApi";
import  {useUserInfo}  from '../Context/UserContext';
import '../styles/Page.css'


function Layout() {
    const { setTotalBalance, setDepositLimit, setActiveStatus } = useUserInfo();


    useEffect(() => {
        async function fetchPresets() {
                const data = await GetUserPresetsAsync();

                if (!data) {
                    console.log("Error fetching");
                    return;
                }
                setTotalBalance(data.balance);
                setDepositLimit(data.depositLimit);
                setActiveStatus(data.activeStatus);
            }
        fetchPresets();
    }, []);

    return (
        <>
            <div className="Page-container">
                <div>
                    <Header />
                </div>
                <div>
                    <Outlet />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Layout
