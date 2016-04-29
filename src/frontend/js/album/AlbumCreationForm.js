import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { albumFormSubmitFetch as submitAction } from './albumActions';

const validate = ({
    albumTitle,
}) => {
    const errors = {};

    if (!albumTitle) {
        errors.albumTitle = 'Il faut un titre';
    }

    return errors;
};

class AlbumCreationForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({ collectionId, albumTitle }) {
        console.log('JE SUBMIT AVEC ' + collectionId);
        this.props.submitAction({ collectionId, albumTitle });
    }

    render() {
        const {
            fields: { collectionId, albumTitle }, // eslint-disable-line no-unused-vars
            handleSubmit,
            submitting,
        } = this.props;

        return (
            <form
                className="create_password"
                onSubmit={handleSubmit(this.handleSubmit)}
            >
                <div className="form-group row">
                    <div className="col-sm-4 col-sm-offset-4">
                        <input
                            type="input"
                            className={classNames('form-control', {
                                'form-control-success': albumTitle.touched && !albumTitle.error,
                                'form-control-danger': albumTitle.touched && albumTitle.error,
                            })}
                            placeholder={`Nom de l'album`}
                            {...albumTitle}
                        />
                        {albumTitle.touched && albumTitle.error && <span className="help-block">{albumTitle.error}</span>}
                    </div>
                </div>
                <input type="hidden" {...collectionId} />
                <div className="form-group row">
                    <div className="col-sm-4 col-sm-offset-4">
                        <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

AlbumCreationForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    collectionId: PropTypes.string.isRequired,
    submitAction: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};

function mapStateToProps(state, { collectionId }) {
    console.log('ID DE LA COLLECTION' + collectionId);
    return {
        initialValues: {
            collectionId,
            albumTitle: '',
        },
    };
}

export default reduxForm({
    form: 'contactCreatePasswordForm',
    fields: ['collectionId', 'albumTitle'],
    validate,
}, mapStateToProps, { submitAction })(AlbumCreationForm);
