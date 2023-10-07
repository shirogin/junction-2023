import { ArrowRight2, Profile } from "iconsax-react";
import Setting from "./Setting";

const settingList = [
    {
        icon: (
            <div className="w-16 rounded-full ">
                <Profile />
            </div>
        ),
        title: "Personal Info",
        action: "/personalinfo",
        children: <ArrowRight2 />,
    },
    {
        icon: (
            <div className="w-24 rounded-full ">
                <Profile />
            </div>
        ),
        title: "Enable Advising",
        action: "/",
        children: <ArrowRight2 />,
    },
    {
        icon: (
            <div className="w-24 rounded-full ">
                <Profile />
            </div>
        ),
        title: "Support & Questions",
        action: "/support",
        children: <ArrowRight2 />,
    },
    {
        icon: (
            <div className="w-16 rounded-full ">
                <Profile />
            </div>
        ),
        title: "Close Account",
        action: "/logout",
    },
];

const Settings = () => {
    return (
        <div className="flex flex-col bg-base-100 text-black p-8">
            <div>
                <h1>Settings</h1>
                <div className="avatar"></div>
            </div>
            <img src="/public/card.png" />
            <div>
                <h2>Streaks</h2>
                <div>
                    <div className="avatar"></div>
                    <div className="avatar"></div>
                </div>
            </div>
            <div>
                {settingList.map((set) => (
                    <Setting title={set.title} icon={set.icon} action={set.action}>
                        {set.children}
                    </Setting>

                ))}
            </div>
        </div>
    );
};

export default Settings;
