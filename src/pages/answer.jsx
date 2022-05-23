import React, { useRef, useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    ListItemCell,
    Icon,
    Range,
    Row,
    Button,
    useStore
} from 'framework7-react';
import store from '../js/store';

const AnswerPage = (props) => {
    const question = store.getters.article_actuel.value;
    const erreur_maximum = useStore("erreur_maximum");
    const [erreur_affichee, setErreurAffichee] = useState(store.getters.erreur_actuelle.value);
    const [iterations, setIterations] = useState(-1);
    const [ready, setReady] = useState(false);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const erreur = Math.abs(Math.floor(question.price.amount) - parseInt(props.proposition));
            setIterations(Math.min(erreur, erreur_maximum-erreur_affichee+1));
            store.dispatch("setErreurActuelle", { value: store.getters.erreur_actuelle.value + erreur });
        }, 2000);
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (iterations > 0) {
                const timer = setTimeout(() => {
                    setErreurAffichee(erreur_affichee + 1);
                    setIterations(iterations - 1);
                }, 1000);
                return () => clearTimeout(timer);
            }
            else {
                setReady(true);
            }
        }
    }, [iterations])

    return (
        <Page>
            <Navbar title={"Objet " + store.getters.question_actuelle.value + " / " + store.getters.nombre_questions.value}
                backLink="Back" backLinkUrl="/" backLinkForce={true} />
            <Block>
                <BlockTitle>Progression du Tyrolien</BlockTitle>
                <List simpleList>
                    <ListItem>
                        <ListItemCell className="width-auto flex-shrink-0">
                            <Icon
                                ios="f7:house_fill"
                                aurora="f7:house_fill"
                                md="material:house_fill"
                            />
                        </ListItemCell>
                        <ListItemCell className="flex-shrink-3">
                            <Range
                                min={0}
                                max={erreur_maximum}
                                step={1}
                                value={erreur_affichee}
                                color="red"
                                disabled={true}
                                scale={true}
                                scaleSteps={5}
                                scaleSubSteps={5}
                            />
                        </ListItemCell>
                        <ListItemCell className="width-auto flex-shrink-0">
                            <Icon
                                ios="f7:xmark_seal_fill"
                                aurora="f7:xmark_seal_fill"
                                md="material:cancel_fill"
                            />
                        </ListItemCell>
                    </ListItem>
                </List>
            </Block>
            <Block strong>
                <Row>{question.title}</Row>
                <Row>{"Votre proposition : " + props.proposition + "." + Math.round((question.price.amount * 100) % 100) + " €"}</Row>
                <Row>{"Bonne réponse : " + question.price.amount + " €"}</Row>
            </Block>
            <Button fill raised href="/next/" style={{ display: ready ? "block" : "none" }}>Continuer</Button>
        </Page>
    );
}

export default AnswerPage;
