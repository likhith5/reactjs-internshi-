import { Link } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost() {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                Safak
              </Link>
            </b>
          </span>
          <span>1 day ago</span>
        </div>
        <p className="singlePostDesc">
        This error occurs due to certain challenges, pain arises and hinders progress!
         The requirements for pleasure bring blessings, seeking happiness despite difficult circumstances!
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        This error occurs due to certain challenges, pain arises and hinders progress!
         The requirements for pleasure bring blessings, seeking happiness despite difficult circumstances!"
          <br />
          <br />
          This error occurs due to certain challenges, pain arises and hinders progress!
           The needs of pleasure bring blessings, seeking happiness despite difficult circumstances! 
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. This error occurs due to certain challenges, 
           pain arises and hinders progress! The needs of pleasure bring blessings,
            seeking happiness despite difficult circumstances!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. This error occurs due to certain challenges, 
            pain arises and hinders progress! The needs of pleasure bring blessings, 
          seeking happiness despite difficult circumstances! Lorem ipsum dolor sit amet, consectetur.".
        </p>
      </div>
    </div>
  );
}
