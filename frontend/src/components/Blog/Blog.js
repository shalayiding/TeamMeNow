import React from "react";
import "./Blog.css"; // Assuming you have a CSS file for styling

function Blog() {
  return (
    <div className="blog-container">
      <h1 className="blog-title">My Blog Title</h1>
      <img
        src="https://techcrunch.com/wp-content/uploads/2021/05/Discord_IAP_KeyVisuals_Header_02.jpeg"
        alt="Descriptive Alt Text"
        className="blog-image"
      />
      <p className="blog-content">
        This is the content of my blog. Here I can write anything I find
        interesting. This paragraph will contain the main information of my blog
        post.
      </p>
      <h1 className="blog-title">My Blog Title</h1>
      <img
        src="https://techcrunch.com/wp-content/uploads/2021/05/Discord_IAP_KeyVisuals_Header_02.jpeg"
        alt="Descriptive Alt Text"
        className="blog-image"
      />
      <p className="blog-content">
        This is the content of my blog. Here I can write anything I find
        interesting. This paragraph will contain the main information of my blog
        post.
      </p>
      <h1 className="blog-title">My Blog Title</h1>
      <img
        src="https://techcrunch.com/wp-content/uploads/2021/05/Discord_IAP_KeyVisuals_Header_02.jpeg"
        alt="Descriptive Alt Text"
        className="blog-image"
      />
      <p className="blog-content">
        This is the content of my blog. Here I can write anything I find
        interesting. This paragraph will contain the main information of my blog
        post.
      </p>
      {/* You can add more content here as needed */}
    </div>
  );
}

export default Blog;
