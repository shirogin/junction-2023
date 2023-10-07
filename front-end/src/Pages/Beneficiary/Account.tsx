import Card from "./Card";

const AccountsType = [
    {
        icon: "/public/3d-fluency-padlock 1.png",
        color: "primary",
        title: "Current",
        sub: "the current account for daily purchases",
    },
    {
        icon: "/public/3d-fluency-padlock 1.png",
        color: "primary",
        title: "Savings",
        sub: "based on your savings choises",
    },
    {
        icon: "/public/3d-fluency-padlock 1.png",
        color: "primary",
        title: "Investments",
        sub: "money to invest for long term choises",
    },
];
type AccountProps = {
    title: string;
    subtitle: string;
    next: React.ReactNode;
    previous: React.ReactNode;
    selectedAccount: string | null;
    onSelectAccount: (account: string) => void;
};

const Account: React.FC<AccountProps> = ({ title, subtitle, next, previous, selectedAccount, onSelectAccount }) => {

    const handleSelect = (account: string) => {
        if (selectedAccount !== account) {
            onSelectAccount(account);
        }
    };

    return (
        <div className="flex flex-col mt-4 gap-4">
            <h1 className="text-2xl font-bold">{title} </h1>
            <p className="">{subtitle}</p>
            {AccountsType.map((type) => (
                <Card
                    key={type.title}
                    title={type.title}
                    icon={type.icon}
                    color={type.color}
                    sub={type.sub}
                    selected={selectedAccount === type.title}
                    onSelect={() => handleSelect(type.title)}
                />
            ))}
            <div>
               {previous}
                {next}
            </div>
        </div>
    );
};


export default Account;
