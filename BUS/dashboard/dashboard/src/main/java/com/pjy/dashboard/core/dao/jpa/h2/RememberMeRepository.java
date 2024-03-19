package com.pjy.dashboard.core.dao.jpa.h2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pjy.dashboard.core.domain.security.RememberMeVo;

/*
 * Java Persistence API (자바 ORM 기술에 대한 API 표준 명세)
 *  - JPA에서는 단순히 Repository 인터페이스를 생성한후 JpaRepository<Entity, 기본키 타입> 을 상속받으면(extends하면) 
 *  기본적인 Create, Read, Update, Delete가 자동으로 생성된다.
 *  출처: https://goddaehee.tistory.com/209?category=367461 [갓대희의 작은공간]
 *  
 *  https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=ppuagirls&logNo=221401627835
 */
@Repository
public interface RememberMeRepository extends JpaRepository<RememberMeVo, Integer> {
    
    //Optional<RememberMeVo> findByUserId(String userId);
    
    //비워있어도 잘 작동함. 
    // long 이 아니라 Long으로 작성. ex) int => Integer 같이 primitive형식 사용못함 
    // findBy뒤에 컬럼명을 붙여주면 이를 이용한 검색이 가능하다 
    //public List<MemberVo> findByName(String name); 
    //like검색도 가능 
    //public List<MemberVo> findByNameLike(String keyword);
    //출처: https://goddaehee.tistory.com/209?category=367461 [갓대희의 작은공간]

    //@Query(value = "select * from MEMBER where userId = ?1", nativeQuery = true)
    //RememberMeVo testserId(String userId);
    @Query(value = "select count(*) from REMEMBER_ME where series = ?1", nativeQuery = true)
    int countBySeries(String series);

	RememberMeVo findBySeries(String series);


	@Transactional 
	@Modifying
    @Query(value = "delete from REMEMBER_ME where user_id = ?1", nativeQuery = true)
	void deleteByUserId(String username);
}

/*
 * ▶ 1. 장점
1) 생산성이 뛰어나고 유지보수가 용이하다.(데이터베이스 중심 설계에서 객체 중심 설계로 변경됨에 따른)
 - 객체 지향적인 코드로 인해 더 직관적이고 비즈니스 로직에 더 집중할 수 있게 도와준다.
 - 객체지향적으로 데이터를 관리할 수 있기 때문에 전체 프로그램 구조를 일관되게 유지할 수 있다.
 - SQL을 직접적으로 작성하지 않고 객체를 사용하여 동작하기 때문에 유지보수가 더욱 간결하고, 재사용성도 증가하여 유지보수가 편리해진다.
 - DB컬럼이 추가될 때마다 테이블 수정이나 SQL 수정하는 과정이 많이 줄어들고, 값을 할당하거나, 변수 선언등의 부수적인 코드 또한 급격히 줄어든다.
 - 각각의 객체에 대한 코드를 별도로 작성하여 코드의 가독성도 올라간다.

2) DBMS에 대한 종속성이 줄어든다.
 - DBMS가 변경된다 하더라도 소스, 쿼리, 구현 방법, 자료형 타입 등을 변경할 필요가 없다.
 - 즉 프로그래머는 Object에만 집중하면 되고, DBMS를 교체하는 작업에도 비교적 적은 리스크와 시간이 소요된다.
   특히 요즘은 탈Oracle을 하여 MariaDB 등의 무료, 오픈소스 기반의 DMBS로 변경하는 기업이 늘고 있는데 이럴때 개발자들이 신경쓸 부분이 현저히 줄어든다.

 

▶ 2. 단점
1) 어렵다.
 - JPA의 장점을 살려 잘 사용하려면 학습 비용이 높은 편이다.
 - 복잡한 쿼리를 사용해야 할 때에 불리하다.
   업무 비즈니스가 매우 복잡한 경우 JPA로 처리하기 어렵고, 통계처리와 같은 복잡한 쿼리 자체를 ORM으로 표현하는데 한계가 있다.
   (실시간 처리용 쿼리에 더 최적화되어 있다고 봐도 무방할 것이다.)
 - 결국 기존 데이터베이스 중심으로 되어 있는 환경에서는 JPA를 사용하기도 어렵고, 힘을 발휘하기 어렵다.
 - 잘못사용할 경우 실제 SQL문을 직접 작성하는 것보다는 성능이 비교적 떨어질 수 있다.
 - 대용량 데이터 기반의 환경에서도 튜닝이 어려워 상대적으로 기존 방식보다 성능이 떨어질 수 있다.


결국 업무 환경, 이러한 장단점을 고려하여 Mybatis를 사용할지 JPA를 사용할지 의사결정에 참고하면 좋을 것 같다.



출처: https://goddaehee.tistory.com/209?category=367461 [갓대희의 작은공간]
 */
