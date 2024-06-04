import maleImage from "./male.jpg";
import femaleImage from "./female.jpg";
import "./shared.css";
function ListItem({props, profile ,onSelectProfile}) {
  const imageSrc = profile.Gender === "Male" ? maleImage : femaleImage;
    const imageStyle = {
        width: "200px",
        height: "200px",
        margin: "10px",
        borderRadius: "40px"
    }
    
  return (
    <div onClick={() => onSelectProfile(profile)}>
      <img style={imageStyle} className="listitem" src={imageSrc} alt={profile.Name} />
      <p>{profile.Name}</p>
    </div>
  );
}

export default ListItem;
