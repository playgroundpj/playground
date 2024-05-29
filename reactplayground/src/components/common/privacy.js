import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

const CHECKED = '#97A482';
const UNCHECKED = '#545450';

function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            type="button"
            className='agreeBtn'
            style={{ color: isCurrentEventKey ? CHECKED : UNCHECKED, width: '100%' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

function Privacy({ handleAgreementChange, isAgreementChecked }) {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey="0">개인정보 처리방침 (필수)</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <input
                            className='checkboxBtn'
                            type="checkbox"
                            id="privacyPolicy"
                            onChange={handleAgreementChange}
                            checked={isAgreementChecked}
                        />
                        <label htmlFor="privacyPolicy">개인정보 처리방침에 동의합니다.</label>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey="1">이용약관 (필수)</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <input
                            className='checkboxBtn'
                            type="checkbox"
                            id="termsOfService"
                            onChange={handleAgreementChange}
                            checked={isAgreementChecked}
                        />
                        <label htmlFor="termsOfService">이용약관에 동의합니다.</label>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default Privacy;
