const Support = () => {
  return (
    <div className="flex flex-col bg-white w-full h-full items-center gap-6">
      <img
        src="/casual-life-3d-young-man-in-headset-using-computer 1.png"
        alt="young man"
        className="w-[18rem] mt-[5rem]"
      />
      <div className="flex flex-col w-[70%] h-[40%] text-center gap-2">
        <h1 className="text-[#0F1336] text-4xl w-full">Dinar Support</h1>
        <p className="text-[#000000] w-full">
          Our team is here to assist you with any questions or issues related to
          our Dinar mobile app
        </p>
      </div>
      <div className="h-[20%] w-[60%] flex flex-col items-center mb-20 gap-4">
        <button
          className="
        h-[3rem] w-full text-white
         start-chat rounded-[20px] flex items-center justify-center gap-4"
        >
          {" "}
          <img src="/icon _message.png" alt="message" />
          Start chat
        </button>
        <button
          className="h-[3rem] w-full faq rounded-[20px]
         text-[#0F1336] flex items-center justify-center gap-4"
        >
          {" "}
          <img src="/icon _message question_.png" alt="question" />
          View FAQ
        </button>
      </div>
    </div>
  );
};

export default Support;
