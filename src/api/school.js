import request from '@/utils/request'

// /school/article/pageArticles 商学院获取分页文章
export function fetchArticleList(query) {
  return request({
    url: '/school/article/pageArticles',
    method: 'get',
    params: query
  })
}

// /school/article/addOrUpdate 商学院添加更新文章
export function addOrUpdateArticle(data) {
  return request({
    url: '/school/article/addOrUpdate',
    method: 'post',
    data
  })
}

// /school/article/get/{articleId} 用id获取文章
export function getArticle(articleId) {
  return request({
    url: '/school/article/get/' + articleId,
    method: 'get'
  })
}

// /school/article/delete/{articleId} 商学院用id删除文章用id
export function deleteArticle(articleId) {
  return request({
    url: '/school/article/delete/' + articleId,
    method: 'get'
  })
}

// /school/tutor/pageTutors  获取分页导师
export function fetchTutorList(query) {
  return request({
    url: '/school/tutor/pageTutors',
    method: 'get',
    params: query
  })
}

// /school/tutor/addOrUpdate 添加或者更新导师
export function addOrUpdateTutor(data) {
  return request({
    url: '/school/tutor/addOrUpdate',
    method: 'post',
    data
  })
}

// /school/tutor/delete/{tutorId} 删除导师
export function deleteTutor(tutorId) {
  return request({
    url: '/school/tutor/delete/' + tutorId,
    method: 'get'
  })
}

// /school/tutor/get/{tutorId} 获取导师
export function getTutor(tutorId) {
  return request({
    url: '/school/tutor/get/' + tutorId,
    method: 'get'
  })
}
