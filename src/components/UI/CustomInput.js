import styles from "./CustomInput.module.css";

const CustomInput = (props) => {
  return (
    <div className={styles.inputGroup}>
      <input
        type={props.children}
        autoComplete="off"
        name="text"
        className={styles.input}
        placeholder={props.children}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default CustomInput;
