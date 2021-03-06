import React, { useState } from 'react';
import { Page, Navbar, Row, Col, Block, Stepper, Button } from 'framework7-react';
import store from '../js/store';

const QuestionPage = () => {
    const question = store.getters.article_actuel.value;
    const [answer, setAnswer] = useState(10);

    return (
        <Page>
            <Navbar title={"Objet " + store.getters.question_actuelle.value + " / " + store.getters.nombre_questions.value}
                backLink="Back" backLinkUrl="/" backLinkForce={true} />
            <Block strong>
                <Row nogap>
                    {question.title}
                </Row>
            </Block>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <img src={"images/" + question._id.$oid + ".jpg"} height={500} />
            </div>
            <Row>
                <Col width="5"></Col>
                <Col width="25">
                    <Stepper value={answer} min={10} max={99} step={1} autorepeat={true}
                             manualInputMode={true} decimalPoint={0} onStepperChange={(e) => setAnswer(e)} />
                    <span style={{fontSize: "x-large"}}>{"." + (question.price.amount % 1).toFixed(2).slice(-2) + " €"}</span>
                </Col>
                <Col width="50">
                    <Button fill raised href={"/answer/" + answer + "/"}>Valider</Button>
                </Col>
            </Row>
        </Page>
    );
}

export default QuestionPage;
