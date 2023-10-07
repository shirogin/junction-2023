

// type AccountType = {
//   icon: string;
//   color: string;
//   title: string;
//   sub: string;
// };

type CardProps = {
  title: string;
  sub: string;
  icon: string;
  i: number;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
};

const Card: React.FC<CardProps> = ({ i, title, sub, icon, selected,disabled, onSelect }) => {
  return (
      <div className={`card shadow-xl`} onClick={onSelect}>
          <div className=" card-body flex flex-row items-center p-4 justify-between">
            <div className="flex gap-4">

              <div className="avatar">
                  <div className={`w-20 h-20 p-8 rounded-full bg-custom${i}`}>
                      <img src={icon} alt={title} />
                  </div>
              </div>
              <div className="flex flex-col">
                  <h1 className="card-title text-lg">{title}</h1>
                  <p className="text-sm">{sub}</p>
              </div>
            </div>
              <input
                  type="radio"
                  name="accountSelection"
                  className="radio checked:bg-primary"
                  checked={selected}
                  disabled= {disabled}
              />
          </div>
      </div>
  );
};

export default Card;
