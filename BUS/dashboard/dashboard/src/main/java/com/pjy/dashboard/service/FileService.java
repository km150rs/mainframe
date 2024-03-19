package com.pjy.dashboard.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.core.dao.jpa.h2.FileRepository;
import com.pjy.dashboard.core.domain.security.FileEntity;
import com.pjy.dashboard.core.error.exception.BusinessException;
import com.pjy.dashboard.core.error.exception.ErrorCode;
import com.pjy.dashboard.domain.CommonCodeVo;
import com.pjy.dashboard.mapper.h2.h2Mapper;
import com.pjy.dashboard.util.DateUtil;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Getter
public class FileService {

    @Value("${file.image.dir}")
    private String fileImageDir;

    @Value("${file.templete.dir}")
    private String fileTempleteDir;

    @Value("${file.output.dir}")
    private String fileOutputDir;

    private final FileRepository fileRepository;

	@Autowired
	@Getter
	private h2Mapper h2DbMapper;

    
    public String saveFile(CommonCodeVo vo,MultipartFile files) throws IOException {
        if (files.isEmpty()) {
            return null;
        }

        // 원래 파일 이름 추출
        String origName = files.getOriginalFilename();
        String savedName = null;
        
    	if (vo.getFileGb().equals("empImage")) {
	        // 파일 이름으로 쓸 uuid 생성
	        String uuid = UUID.randomUUID().toString();
	        // 확장자 추출(ex : .png)
	        String extension = origName.substring(origName.lastIndexOf("."));
	        // uuid와 확장자 결합
	        savedName = uuid + extension;
    	} else {
            // 파일을 불러올 때 사용할 파일 경로
    		savedName = origName;
    	}
        String savedPath = null;
    	if (vo.getFileGb().equals("empImage")) 
    		savedPath = fileImageDir + savedName;
    	else savedPath = fileTempleteDir + savedName;
    	
        // 파일 엔티티 생성
        FileEntity file = FileEntity.builder()
        		.file_id(vo.getFileId())
                .orgNm(origName)
                .savedNm(savedName)
                .savedPath(savedPath)
                .company_no(vo.getCompanyNo())
                .file_gb(vo.getFileGb())
                .last_chg_user(vo.getLastChgUser())
                .last_chg_date(DateUtil.getSysDate())
                .build();

        // 실제로 로컬에 uuid를 파일명으로 저장
        files.transferTo(new File(savedPath));

        // 데이터베이스에 파일 정보 저장 
        FileEntity fileEntity = fileRepository.findByEmpNm(vo.getCompanyNo(),vo.getFileGb(),vo.getFileId());
        if (fileEntity != null) {
        	fileRepository.deleteByEmpNm(vo.getCompanyNo(),vo.getFileGb(),vo.getFileId());
        }
        fileRepository.saveByKey(file);

        return vo.getFileId();
    }
    public String deleteFile(CommonCodeVo vo) throws IOException {
        if (vo.getFileId().isEmpty()) {
            return null;
        }

        FileEntity fileEntity = fileRepository.findByEmpNm(vo.getCompanyNo(),vo.getFileGb(),vo.getFileId());
        if (fileEntity == null) {
        	return null;
        }
    	fileRepository.deleteByEmpNm(vo.getCompanyNo(),vo.getFileGb(),vo.getFileId());
    	
        File file = new File(fileEntity.getSavedPath());
        file.delete();

        return "ok";
    }    
    
    
	/* 
	 *  최대 : getMaxFileCount건
	 * */
    public String viewFileList(CommonCodeVo vo) throws Exception {
    	String path = fileOutputDir + vo.getBaseYmd();
    	
    	ObjectMapper mapper = new ObjectMapper();

    	File dirFile = new File(path );
        String fileList[] = dirFile.list(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.endsWith(".xlsx");
            }
        });
        
		List<Object> infoList = new ArrayList<Object>();
		if (fileList != null)	{
	    	for(String fileName:fileList){
	            Map<String, Object> info = new HashMap<String, Object>();
	            File f = new File(path , fileName);
	            
	            info.put("name", fileName); 
	            info.put("date", DateUtil.getBasicDate(new Date(f.lastModified()))); 
	            info.put("size", f.length()); 
	            infoList.add(info);
	    	}
		}
    	String jsonStr = mapper.writeValueAsString(infoList);
    	return jsonStr;    	
    }
    

	// **************************************************************************    
	// 승무지시서 excel 생성
	// **************************************************************************    
	public String createExcel_Normal(CommonCodeVo vo)    throws  Exception {
	    String fileName = "";

	    List<Map<String, Object>> routeList = this.getH2DbMapper().select_getListRouteDrivingOrder(vo);
		
		for (Map<String, Object> map : routeList) { 
			// 해당 노선의 해당일자 배차정보 가져오기
		    vo.setRouteNm(map.get("FILE_ID").toString());
			List<Map<String, Object>> rec = this.getH2DbMapper().select_getDailyArrangeInfo(vo);
			if (rec.size() == 0)	continue;
			
			String m_strTemplateFile = map.get("SAVEDPATH").toString(); // "d:\\bus\\image\\template_승무지시서(5번).xlsx";
		    String week_gb = map.get("WEEK_GB").toString(); //평공토
		    try {
		        XSSFWorkbook book = new XSSFWorkbook(new FileInputStream(new File(m_strTemplateFile)));
		        XSSFSheet sheet2 = book.getSheet("rawdata");
		
		        for(int i=book.getNumberOfSheets()-1;i>=0;i--){
	                XSSFSheet tmpSheet =book.getSheetAt(i);
	                // rawdata sheet와 해당 평공토 sheet를 제외한 sheet 삭제처리
	                if(!tmpSheet.getSheetName().equals("rawdata") && !tmpSheet.getSheetName().equals(week_gb)){
	                    book.removeSheetAt(i);
	                }
	            }       
		        String dd = vo.getBaseYmd().substring(8, 10);
		        book.setSheetName(0, week_gb + "(" + dd + ")");
		        createSheet_Normal_1(book,sheet2,vo,rec);
		
		        book.setForceFormulaRecalculation(true);
		        fileName = saveExcel(book,vo.getBaseYmd(), map.get("NEWFILENM").toString());
		        
		    } catch(IOException e){
		        log.debug("Server exception:: " + e.getMessage());
		        e.printStackTrace();
		    }        

		}

	    return fileName;
	}
	
	// 승무지시서 sheet 1
	public void createSheet_Normal_1(Workbook xlsWb,Sheet sheet,CommonCodeVo vo,List<Map<String, Object>> rec)    throws  IOException {
		int i =0; 
        int k =0;
        Cell cell = null;
        Row  row = null;

		try {
		    for (Map<String, Object> map : rec) {
		    	i = 0;
		    	for (Entry<String, Object> entry : map.entrySet()) {

		    		String key = entry.getKey();
		    		String value = "";
		    		Object obj = entry.getValue();
		    		if (obj instanceof Integer)
		    			value = String.format("%d", obj);
		    		else value = (String)obj;

		    		//log.info("key={{}}, value={{}}",key,value);
		    		
	                row = sheet.getRow(k);
	                if (row == null) row = sheet.createRow(k); 
	                cell = row.getCell(i);
	                if (cell == null)  cell = row.createCell(i);

	                cell.setCellValue(value);
	                i++;
		    	}
		    	k++;
		    }
			
	    } catch (Exception e) {
			log.error("jdbcTemplate error: " + e.getMessage());
			throw new BusinessException("jdbcTemplate query error",ErrorCode.INVALID_RESULT); 
	    }
	}
	

    public String saveExcel(Workbook wb,String today,String saveFileNm){
        //String inTime   = new java.text.SimpleDateFormat("HHmmssSSS").format(new java.util.Date());
        //String strFileName = "new" + "_" + inTime + ".xlsx";
    	Path outputPath = Paths.get( fileOutputDir + today );
        // excel 파일 저장
        try {
        	Files.createDirectories(outputPath);
        	
            File xlsFile = new File(outputPath.toString() + "/" + saveFileNm);
            FileOutputStream fileOut = new FileOutputStream(xlsFile);
            wb.write(fileOut);
            fileOut.close();
            //wb.close();
        } catch (FileNotFoundException e) {
            log.error("saveExcel exception: " + e.getMessage());
            e.printStackTrace();
        } catch (IOException e) {
            log.error("saveExcel exception: " + e.getMessage());
            e.printStackTrace();
        }
        return saveFileNm;
    }		  
    
}
