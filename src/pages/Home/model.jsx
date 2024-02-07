import ReactLoading from "react-loading";
import Modal from "shared/modal";

const HomeModel = ({closeModel ,titleInput,detailsInput,addBTN,submitBTN ,detalis ,array ,showSpin}) => {
  return (
    <Modal closeModel={closeModel}>
    <div style={{ textAlign: "left" }}>
      <input onChange={(eo) => {
      titleInput(eo)
      }} type="text" placeholder="Add Title" required />
      <div>
        <input onChange={(eo) => {
          detailsInput(eo)

        }} type="text" placeholder="detalis" value={detalis} required />
        <button onClick={(eo) => {
          addBTN(eo)
      }}>Add</button>
      </div>

      <ul>
        {array.map((item) => (
        <li key={item}>{item}</li>
        ))}
      </ul>


      <button onClick={ async (eo) => {
        submitBTN(eo)
      }}>
        {/* submit */}
        {showSpin ?   <ReactLoading type={"spin"} color={"red"} height={20} width={20} /> : "submit"}
      
      
      </button>
    </div>
  </Modal>
  );
}

export default HomeModel;
