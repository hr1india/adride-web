import React from 'react';
import Carder from '../components/Card';
import { Row, Col, Container } from 'react-bootstrap';
import { useGetWallsQuery } from '../slices/wallApiSlice';
import { useGetAutosQuery } from '../slices/autoApiSlice';
import { useGetHelmetsQuery } from '../slices/helmetApiSlice';
import Loader from '../components/Loader';

const NewAdsScreen = () => {
    const { data: walls, error: wallEr, isLoading: wallLoad } = useGetWallsQuery();
    const { data: autos, error: autoEr, isLoading: autoLoad } = useGetAutosQuery();
    const { data: helmets, error: helmetEr, isLoading: helmetLoad } = useGetHelmetsQuery();

    // Debugging: Check what data is coming from API
    console.log("Wall Ads Data:", walls);
    console.log("Auto Ads Data:", autos);
    console.log("Helmet Ads Data:", helmets);

    return (
        <div style={{ backgroundColor: 'rgba(240, 41, 41, 0.17)', minHeight: '100vh', padding: '20px' }}>
            <h1 className='text-center' style={{ color: 'black' }}>Latest Products</h1>
            <h3 className='text-center'>Review and manage ads submitted for approval</h3>

            <Container>
                {/* WALL ADS SECTION */}
                <section className="mt-4">
                    <h2 className="text-center">Wall Ads</h2>
                    {wallLoad ? <Loader /> : wallEr ? <h4 className="text-danger">Failed to load wall ads.</h4> : (
                        <Row>
                            {walls?.wallAds?.map(wall => (
                                <Col key={wall._id} sm={12} md={6} lg={4} xl={3}>
                                    <Carder ads={wall} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </section>

                {/* AUTO ADS SECTION */}
                <section className="mt-4">
                    <h2 className="text-center">Auto Ads</h2>
                    {autoLoad ? <Loader /> : autoEr ? <h4 className="text-danger">Failed to load auto ads.</h4> : (
                        <Row>
                            {autos?.ads ? (
                                autos.ads.map(auto => (
                                    <Col key={auto._id} sm={12} md={6} lg={4} xl={3}>
                                        <Carder ads={auto} />
                                    </Col>
                                ))
                            ) : (
                                <h5 className="text-center">No auto ads available.</h5>
                            )}
                        </Row>
                    )}
                </section>

                {/* HELMET ADS SECTION */}
                <section className="mt-4">
                    <h2 className="text-center">Helmet Ads</h2>
                    {helmetLoad ? <Loader /> : helmetEr ? <h4 className="text-danger">Failed to load helmet ads.</h4> : (
                        <Row>
                            {helmets?.ads ? (
                                helmets.ads.map(helmet => (
                                    <Col key={helmet._id} sm={12} md={6} lg={4} xl={3}>
                                        <Carder ads={helmet} />
                                    </Col>
                                ))
                            ) : (
                                <h5 className="text-center">No helmet ads available.</h5>
                            )}
                        </Row>
                    )}
                </section>
            </Container>
        </div>
    );
};

export default NewAdsScreen;
