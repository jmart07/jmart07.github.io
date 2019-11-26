const React = require('react');
const AppLayout = require('../layout/AppLayout.jsx')



class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return(
            <AppLayout title="Everything">
                <div className="container">
                {
                    this.props.tasks.map((task, i) => {
                        return(
                            <a href={`/tasks/${task._id}`}>
                                <div className="item" id={i} key={`li${i}`}>
                                    <p>{task.name}</p>                           
                                    <p>{task.dueDate.toLocaleDateString()}</p>
                                    <p>{task.dueDate.toLocaleTimeString()}</p>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
            </AppLayout>
        );
    }
}

module.exports = Index;