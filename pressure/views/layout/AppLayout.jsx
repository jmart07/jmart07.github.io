const React = require('react');

class AppLayout extends React.Component{
  render() {
    return (
      <html lang="en" dir="ltr">
        <head>
            <meta charSet="utf-8"/>
            <title>{this.props.title}</title>
            <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"/>            <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        </head>
        <body>
            <nav>
                <a href="/">TODAY</a>
                <a href="/tasks">ALL</a>
                {/* <a href="/tasks/new">Add New</a> */}
            </nav>
          <h1>{this.props.title}</h1>
            {this.props.children}
        </body>
    </html>
    )
  }
}
module.exports= AppLayout;