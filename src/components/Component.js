
import '../App.css';

function Components({ blogs, active, active1, tigger }) {

  return (
    <div id="container">
      <div className="title">
        <div>
          <h1></h1>
        </div>
        <div>
          <button className="btn btn-intermediate" onClick={active}>{tigger ? "Cancel" : "Add Album"}</button>
        </div>
      </div>
      {blogs.map((blog) => (
        <div key={blog.id} className="element">
          <p onClick={() => active1(blog.id)}>{blog.title}</p>
          {console.log(blog.regions)}
        </div>


      ))}
    </div>
  )
}
export default Components
