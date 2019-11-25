const React = require('react');
const AppLayout = require('../layout/AppLayout.jsx')

class Edit extends React.Component {
    render() {
        return(
            <AppLayout title="Edit...">
                <form action={`/tasks/${this.props.task._id}?_method=PUT`} method="POST">
                    <div className="field">
                        <label className="field">Name</label>
                        <div className="control">
                            <input type="text" name="name" defaultValue={this.props.task.name}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="field">Due Date</label>
                        <div className="control">
                            <input type="date" name="dueDate" defaultValue={this.props.task.dueDate}/>
                        </div>
                    </div>
                    <div className="control">
                        <input type="submit" name="" value="Submit changes"/>
                    </div>
                </form>
            </AppLayout>
        );
    }
}

module.exports = Edit;