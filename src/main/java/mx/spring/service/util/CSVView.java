package mx.spring.service.util;

import java.io.BufferedWriter;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CSVView extends org.springframework.web.servlet.view.AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> modelMap,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		BufferedWriter writer = new BufferedWriter(response.getWriter());

		try {
			String fileName = (String) modelMap.get("fileName");

			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ fileName + "\"");

			ArrayList<String[]> myDbData = (ArrayList<String[]>) modelMap
					.get("records");

			for (String[] row : myDbData) {

				String rowStr = "";
				for (String column : row) {

					rowStr += column + ",";

				}

				writer.write(rowStr.substring(0, rowStr.length() - 1));
				writer.flush();
			}

		} catch (Exception ex) {
			
			logger.error("µ¼³öcsv³ö´í", ex);

		} finally {
			writer.flush();
			writer.close();
		}
	}

}
