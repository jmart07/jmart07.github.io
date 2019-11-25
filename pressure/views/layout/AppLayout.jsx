const React = require('react');

class AppLayout extends React.Component{
  render() {
    return (
      <html lang="en" dir="ltr">
        <head>
            <meta charSet="utf-8"/>
            <title>{this.props.title}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"/>
            <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
            <link href="~bulma-calendar/dist/css/bulma-calendar.min.css" rel="stylesheet"/>
            <script src="~bulma-calendar/dist/js/bulma-calendar.min.js"></script>
            <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        </head>
        <body>
            <nav className="navbar">
              <div className="navbar-brand">
                <a className="navbar-item" href="/">Home</a>
                <a className="navbar-item" href="/tasks">View All</a>
                <a className="navbar-item" href="/tasks/new">Add New</a>
              </div>
            </nav>
        <h1>{this.props.title}</h1>
          {this.props.children}
        </body>
    </html>
    )
  }
}
module.exports= AppLayout;