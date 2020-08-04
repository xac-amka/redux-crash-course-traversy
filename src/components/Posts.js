import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }
    // state = {
    //     posts: []
    // }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    //         .then(res => res.json())
    //         .then(data => this.setState({ posts: data}))
    // }

    render(){
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ))
        return(
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
})

//PropTypes
Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

// first params' first args is map our state to properties, second args is fetchpost function
// second param is component
export default connect(mapStateToProps, { fetchPosts })(Posts);