import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  // the instant this component appears on the screen we're going to reach out and fetch the specific post
  // presumably the action creator will fetch that post and add it to our post piece of state
  // we need to get that post out of our application level state and into our component with a mapStateToProps funcion
  componentDidMount() {
    // to get access to the id in the url we can use a prop that is provided to us by react-router
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    // we do not yet have an action creator to call, but we will need one
    // because we are going to make an AJAX request to our backend API to delete
    // this very particular post

    // action creators are called from this.props
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;
    // data issues where you try to access props on elements or a record that does
    // not yet exist is something that you are going to run into inside of react and
    // react all the time in your projects. So whenever you see messages that say
    // connect react property title of undefined do make sure the record you are
    // trying to access actually exists and if it does not add in a simple check like
    // this conditional statement below
    if(!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{ post.title }</h3>
        <h6>Categories: { post.categories }</h6>
        <p>{ post.content }</p>
      </div>
    )
  }
}

// function mapStateToProps(state) ---- we only want the posts piece of state or the posts property
// so we can use { posts } to do some destructuring of the argument object and just say "hey! gimme the list of posts here"

// ownProps is the props object that is going to the PostsShow component so whenever
// this component is about to rendered or re-rendered on the screen remember that
// mapStateToProps gets called to figure out what the component needs and mapStateToProps is
// passed all the props that were headed to PostsShow component
// Basically inside the render function this.props === ownProps

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
