import React from 'react';
import styles from './Home.module.scss';

const Home = () => {
    return (
        <div className={`container`}>
            <div className={`row`}>
                <div className={`col-12 ${styles.h1}`}>
                    <h1>About</h1>
                </div>
                <div className={`col-sm-12 col-lg-4 ${styles.block}`}>
                    <h2>First block</h2>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam animi culpa cum deleniti dolor doloremque est et iure, maxime nam optio perferendis praesentium provident reiciendis sequi similique tempora voluptatibus!
                    </div>
                </div>
                <div className={`col-sm-12 col-lg-4 ${styles.block}`}>
                    <h2>Second block</h2>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aspernatur atque beatae cum deserunt, doloremque, eum impedit inventore ipsum natus nihil nostrum praesentium provident quas, quisquam repellendus sint voluptates?
                    </div>
                </div>
                <div className={`col-sm-12 col-lg-4 ${styles.block}`}>
                    <h2>Third block</h2>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores in non quod. Commodi cumque laudantium magnam maxime nisi omnis repellendus! Culpa eius et expedita impedit molestiae nobis optio sapiente temporibus?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;