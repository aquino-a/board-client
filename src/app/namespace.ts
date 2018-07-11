declare module 'namespace' {

    export interface Address {
        id: number;
        postCode: number;
        fullAddress: string;
        jibunAddress: string;
    }

    export interface Authority {
        role: string;
        authority: string;
    }

    export interface Member {
        id: number;
        username: string;
        name: string;
        email: string;
        age: number;
        enabled: boolean;
        address: Address;
        authorities: Authority[];
        credentialsNonExpired: boolean;
        accountNonLocked: boolean;
        accountNonExpired: boolean;
    }

    export interface Image {
        id: number;
        location: string;
    }

    export interface Content {
        id: number;
        member: Member;
        text: string;
        postDate: Date;
        replies: any[];
        images: Image[];
    }

    export interface Sort {
        sorted: boolean;
        unsorted: boolean;
    }

    export interface Pageable {
        sort: Sort;
        offset: number;
        pageSize: number;
        pageNumber: number;
        unpaged: boolean;
        paged: boolean;
    }

    export interface Sort2 {
        sorted: boolean;
        unsorted: boolean;
    }

    export interface RootObject {
        content: Content[];
        pageable: Pageable;
        last: boolean;
        totalPages: number;
        totalElements: number;
        number: number;
        size: number;
        first: boolean;
        numberOfElements: number;
        sort: Sort2;
    }

}

