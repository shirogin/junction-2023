import React from "react";
import { useNavigate } from "react-router";
type Props = {
    icon: React.ReactNode;
    title: string;
    action: string;
    children?: React.ReactNode;
};

const Setting = ({ icon, title, action, children }: Props) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex justify-between bg-base-100"
            onClick={() => {
                navigate(`${action}`);
            }}
        >
            <div className=" flex mr-4">
                <div className="avatar">{icon}</div>
                <h3 className="text-lg">{title}</h3>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Setting;
