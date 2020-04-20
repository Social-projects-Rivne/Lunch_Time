import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import '../../../styles/category-dropdown.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.onVisibleChange = this.onVisibleChange.bind(this);
  }

  onVisibleChange(visible) {
    this.setState({
      visible: visible,
    });
  }

  saveSelected(selectedKeys) {
    this.setState({
      selected: selectedKeys,
    });
  }

  confirm() {
    const { selected } = this.state;
    const { homePath, path } = this.props;
    if (selected.length > 0) {
      this.props.onApply(path + selected);
    } else {
      this.props.onApply(homePath);
    }
    this.onVisibleChange(false);
  }

  reset() {
    this.setState({
      selected: [],
    }, () => {
      this.confirm();
    });
  }

  render() {
    const { visible, selected } = this.state;
    const { items } = this.props;
    const menu = (
      <Menu
        multiple
        selectedKeys={selected}
        onSelect={(e) => { this.saveSelected(e.selectedKeys); }}
        onDeselect={(e) => { this.saveSelected(e.selectedKeys); }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.replace('\u0020', '\u005f').toLowerCase()}
          >
            {item}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem disabled>
          <Container
            className="text-center "
            style={{
              cursor: 'pointer',
              pointerEvents: 'visible',
            }}
            onClick={() => this.confirm()}
          >
            Select
          </Container>
        </MenuItem>
      </Menu>
    );
    return (
      <Dropdown
        trigger={['click']}
        onVisibleChange={this.onVisibleChange}
        visible={visible}
        closeOnSelect={false}
        overlay={menu}
      >
        <Button>By Category</Button>
      </Dropdown>
    );
  }
}

Category.propTypes = {
  onApply: PropTypes.any.isRequired,
  items: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  homePath: PropTypes.string.isRequired,
};

export default Category;
