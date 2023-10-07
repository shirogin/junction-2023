import Card from "./Card";

const AccountsType = [
    {
        icon: "/public/Current account.svg",
        color: "#eaebfe",
        title: "Current",
        sub: "the current account for daily purchases",
    },
    {
        icon: "/public/casual-life-3d-piggy-bank-with-coins-1 1.svg",
        color: "#fffbd6",
        title: "Savings",
        sub: "based on your savings choises",
    },
    {
        icon: "/public/3d-fluency-stack-of-coins 1.svg",
        color: "#fff2e2",
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
    sourceAccount?: string | null;
};

const Account: React.FC<AccountProps> = ({
    title,
    subtitle,
    next,
    previous,
    selectedAccount,
    onSelectAccount,
    sourceAccount,
}) => {
    const handleSelect = (account: string) => {
        if (selectedAccount !== account) {
            onSelectAccount(account);
        }
    };

    return (
        <div className="flex flex-col mt-4 gap-4">
            <h1 className="text-2xl font-bold">{title} </h1>
            <p className="">{subtitle}</p>
            {AccountsType.map((type, i) => (
                <Card
                    key={type.title}
                    title={type.title}
                    icon={type.icon}
                    i={i+1}
                    sub={type.sub}
                    selected={selectedAccount === type.title}
                    onSelect={() => handleSelect(type.title)}
                    disabled={type.title === sourceAccount}
                />
            ))}
            <div className="flex justify-center gap-8">
                <div>{previous}</div>
                <div>{next}</div>
            </div>
        </div>
    );
};

export default Account;
