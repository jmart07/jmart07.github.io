const React = require('react');
const AppLayout = require('../layout/AppLayout.jsx')

class Show extends React.Component {
    render() {
        return(
            <AppLayout title={ this.props.task.name}>
                <div class="show">
                    <p>{this.props.task.dueDate.toLocaleDateString()}</p>
                    <p>{this.props.task.notes}</p>
                    <form action={`/tasks/edit/${this.props.task._id}`}>
                        <input type="submit" value="Edit"/>
                    </form>
                    <form action={`/tasks/`}>
                        <input type="submit" value="Go Back"/>
                    </form>
                    <form action={`tasks/${this.props.task._id}?_method=DELETE`} method="POST">
                        <input type="submit" value="Delete"></input>
                    </form> 
                </div>
            </AppLayout>
        );
    }
}

module.exports = Show;