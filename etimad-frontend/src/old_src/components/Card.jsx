// function Card({ title, img }) {
//   return (
//     <div className="mx-auto" style={{
//       background: "#fff",
//       width: "90%",
//       height: "310px",   //  fixed height
//       padding: "10px",
//       border: "2px solid black",
//       textAlign: "center",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-evenly",
//       cursor: "pointer",
//       transition: "0.3s",
      
     
//     }}
//     onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
//     onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
//     >

//       <img
//         src={img}
//         style={{
//           width: "100%",
//           height: "220px",
//           objectFit: "contain"
//         }}
//       />
// <h4 style={{
//   fontFamily: "Poppins, sans-serif",
//   fontWeight: "1000",
//   color: "black",   // text color (andar ka)
//   WebkitTextStroke: "0.3px black" ,  //  black stroke
//    fontSize: "18px" 
// }}>
//   {title}
// </h4>
  
//     </div>
//   );
// }

// export default Card; 
function Card({ title, img, price }) {
  return (
    <div className="group w-[90%] mx-auto bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
      
      {/* Image */}
      <div className="h-[240px] bg-slate-50 p-5 flex items-center justify-center">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h4 className="text-lg font-bold text-slate-800 mb-2">
          {title}
        </h4>

        <p className="text-2xl font-extrabold text-[#22666B] mb-3">
          Rs. {Number(price).toLocaleString()}
        </p>

        <button className="w-full bg-[#22666B] text-white py-2 rounded-xl font-medium hover:opacity-90 transition">
          View Details
        </button>
      </div>
    </div>
  );
}

export default Card;