const React = require('react');
const AppLayout = require('../layout/AppLayout.jsx')

class Index extends React.Component {
    render() {
        return(
            <AppLayout title="This will be the view all tasks page...">
                <ul>
                {
                    this.props.tasks.map((task, i) => {
                        return(
                            <li id={i} key={`li${i}`}>
                                <a href={`/tasks/${task._id}`}>{task.name}</a><br/>
                                <a>{task.dueDate.toLocaleDateString()}</a><br/>
                                <a href={`/tasks/edit/${task._id}`}>Edit</a>
                                <form action={`tasks/${task._id}?_method=DELETE`} method="POST">
                                    <input type="submit" value="Delete"></input>
                                </form> 
                            </li>
                        )
                    })
                }
                </ul>
            </AppLayout>
        );
    }
}

module.exports = Index;