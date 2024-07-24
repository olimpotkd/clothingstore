import MenuItem from "../menu-item/MenuItem";
import "./directory.styles.scss";
import { useSelector } from "react-redux";

const Directory = () => {
  const sections = useSelector((state) => state.directory.sections);

  return (
    <div className="directory-menu">
      {sections?.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
