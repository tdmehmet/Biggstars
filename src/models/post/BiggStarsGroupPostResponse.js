import BiggStarsGroupPostOparation from './BiggStarsGroupPostOparation';

export default class BiggStarsGroupPostResponse {
    tokenUserID: string;
    tokenName: string;
    tokenUserImage: string;
    isLastPage: string;
    total: string;
    posts: BiggStarsGroupPostOparation[];
}
