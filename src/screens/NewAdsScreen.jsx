import React from 'react';
import Carder from '../components/Card';
import { Row, Col } from 'react-bootstrap';
import { useGetWallsQuery } from '../slices/wallApiSlice';
import { useGetAutosQuery } from '../slices/autoApiSlice';
import { useGetHelmetsQuery } from '../slices/helmetApiSlice';
import Loader from '../components/Loader';

const NewAdsScreen = () => {
    const { data: walls, error: wallEr, isLoading: wallLoad } = useGetWallsQuery();
    const { data: autos, error: autoEr, isLoading: autoLoad } = useGetAutosQuery();
    const { data: helmets, error: helmetEr, isLoading: helmetLoad } = useGetHelmetsQuery();
    const wallAds = walls?.wallAds || [];

    return (
        <div style={{ backgroundColor: 'rgba(240, 41, 41, 0.17)', minHeight: '100vh', padding: '20px' }}>
            <h1 className='text-center' style={{ color: 'black' }}>Latest Products</h1>
            <h3 className='text-center'>Review and manage ads submitted for approval</h3>
            
            <Row>
                {wallLoad && <Loader />}
                {wallEr && <h1>Something went wrong...</h1>}
                {wallAds && wallAds.map(wall => (
                    <Col key={wall._id} sm={12} md={6} lg={4} xl={4}>
                        <Carder ads={wall} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default NewAdsScreen;
