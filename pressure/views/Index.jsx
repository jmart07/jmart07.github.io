const React = require('react');
const AppLayout = require('./layout/AppLayout.jsx')

class Index extends React.Component {
    render() {
        return(
            <AppLayout title="This will be the index...">
                <ul>
                {
                    this.props.tasks.map((task, i) => {
                        return(
                            <li id={i} key={`li${i}`}>
                                <a href={`/tasks/${task._id}`}>{task.name}</a>
                                {/* <a href={`/tasks/${task._id}`}>{task.dueDate}</a> */}
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