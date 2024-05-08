import React from 'react';
import styles from './modules/HomeDisplay.module.css';


function HomeDisplay() {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Welcome to DealsDray</h1>
                    <p className={styles.heroDescription}>
                        Discover the best products and services for your needs.
                    </p>
                    
                </div>
            </div>

            <div className={styles.featureSection}>
                <h2 className={styles.featureSectionTitle}>Our Features</h2>
                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <i className={`${styles.featureIcon} fas fa-rocket`}></i>
                        <h3 className={styles.featureTitle}>Fast Delivery</h3>
                        <p className={styles.featureDescription}>
                            Get your orders delivered quickly and reliably.
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className={`${styles.featureIcon} fas fa-lock`}></i>
                        <h3 className={styles.featureTitle}>Secure Payments</h3>
                        <p className={styles.featureDescription}>
                            Your transactions are protected with advanced encryption.
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className={`${styles.featureIcon} fas fa-headset`}></i>
                        <h3 className={styles.featureTitle}>24/7 Support</h3>
                        <p className={styles.featureDescription}>
                            Our friendly support team is always here to help you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeDisplay;