import Page from "@/Components/Page";
import PinCode from "@/Components/PinCode";
import { useEffectOnce } from "@/hooks";

const Auth = () => {

    useEffectOnce(() => {
        
    })
    return (
        <Page
            title="Set up PIN Code"
            subtitle="Enter the PIN Code to secure your account"
            icon="/public/3d-fluency-padlock 1.png"
        >
            <div className={``}>
                <PinCode targetCode="1234" />
            </div>
        </Page>
    );
};

export default Auth;
