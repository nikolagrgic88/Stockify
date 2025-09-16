import React from "react";

const MainFooter: React.FC = () => {
  return (
    <footer className=" w-full bg-[#011b4d] text-white py-4 fixed bottom-0">
      <div className="footer-content text-center">
        <p>&copy; {new Date().getFullYear()} Stockify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;
