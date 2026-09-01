import CANDIDATES from './candidates';

const events = [
  {
    id: 1,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 1, 10, 0),
    end: new Date(2023, 5, 1, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[0],
      CANDIDATES[1],
      CANDIDATES[2],
    ],
  },
  {
    id: 2,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 8, 10, 0),
    end: new Date(2023, 5, 8, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[1],
      CANDIDATES[2],
      CANDIDATES[3],
    ],
  },
  {
    id: 3,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 13, 10, 0),
    end: new Date(2023, 5, 13, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[2],
      CANDIDATES[3],
      CANDIDATES[4],
    ],
  },
  {
    id: 4,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 27, 10, 0),
    end: new Date(2023, 5, 27, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[0],
      CANDIDATES[2],
      CANDIDATES[3],
    ],
  },
  {
    id: 5,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 26, 10, 0),
    end: new Date(2023, 5, 26, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[1],
      CANDIDATES[4],
      CANDIDATES[0],
    ],
  },
  {
    id: 6,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 2, 10, 0),
    end: new Date(2023, 5, 2, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[3],
      CANDIDATES[1],
      CANDIDATES[2],
    ],
  },
];

export default events;
