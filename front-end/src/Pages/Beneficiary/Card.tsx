

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
  color: string;
  selected: boolean;
  onSelect: () => void;
};

const Card: React.FC<CardProps> = ({ title, sub, icon, color, selected, onSelect }) => {
  return (
      <div className={`card shadow-xl`} onClick={onSelect}>
          <div className=" card-body flex flex-row gap-4 items-center p-4">
              <div className="avatar">
                  <div className={`w-16 h-16 p-4 rounded-full bg-${color}`}>
                      <img src={icon} alt={title} />
                  </div>
              </div>
              <div className="flex flex-col">
                  <h1 className="card-title text-lg">{title}</h1>
                  <p className="text-sm">{sub}</p>
              </div>
              <input
                  type="radio"
                  name="accountSelection"
                  className="radio checked:bg-primary"
                  checked={selected}
                  
              />
          </div>
      </div>
  );
};

export default Card;
