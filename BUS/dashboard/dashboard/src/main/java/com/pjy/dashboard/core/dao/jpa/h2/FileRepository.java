package com.pjy.dashboard.core.dao.jpa.h2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pjy.dashboard.core.domain.security.FileEntity;


@Repository
public interface FileRepository extends JpaRepository<FileEntity,Long> {
	
    @Query(value = "select * from TBL_FILE_INFO where company_no = :company_no and file_gb = :file_gb and file_id = :empNm", nativeQuery = true)
    FileEntity findByEmpNm(String company_no,String file_gb,String empNm);	

    @Transactional
	@Modifying	// update , delete Query    
    @Query(value = "delete from TBL_FILE_INFO where company_no = :company_no and file_gb = :file_gb and file_id = :empNm", nativeQuery = true)
    Integer deleteByEmpNm(String company_no,String file_gb,String empNm);
    
    @Transactional
	@Modifying	// update , delete Query    
    @Query(value = "INSERT INTO PUBLIC.TBL_FILE_INFO\r\n"
    		+ "(COMPANY_NO, FILE_GB, FILE_ID, ORGNM, SAVEDNM, SAVEDPATH, LAST_CHG_USER, LAST_CHG_DATE)\r\n"
    		+ "VALUES( :#{#entity.company_no}, :#{#entity.file_gb}, :#{#entity.file_id}, :#{#entity.orgNm}, :#{#entity.savedNm}, :#{#entity.savedPath}, :#{#entity.last_chg_user}, :#{#entity.last_chg_date});\r\n"
    		+ "", nativeQuery = true)
    Integer saveByKey(@Param(value = "entity") FileEntity entity);	
    
}

