// A component to display messages such as success and error.
/* eslint-disable max-len */
import { Alert, Collapse } from 'react-bootstrap';
import React from 'react';

export default class Toast extends React.Component {
  componentDidUpdate() {
    const { showing, onDismiss } = this.props;
    if (showing) {
      clearTimeout(this.dismissTimer);
      // save timer in an object variable dismissTimer
      this.dismissTimer = setTimeout(onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  render() {
    const {
      showing, variant, onDismiss, children,
    } = this.props;
    // Collapse in prop:When set to true, the child element shows (fades in) and when set to false, it hides (fades out).
    /* position close to the bottom-left corner of the window */
    return (
      <Collapse in={showing}>
        <div style={{ position: 'fixed', bottom: 20, left: 20 }}>
          <Alert variant={variant} onClose={onDismiss} dismissible>
            {children}
          </Alert>
        </div>
      </Collapse>
    );
  }
}
